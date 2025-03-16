from flask import Flask, request, render_template
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)

def get_client_ip_info():
    """Get client IP address and VPN status from request headers"""
    forwarded_ips = request.headers.getlist("X-Forwarded-For")
    is_likely_vpn = False
    ip_address = request.remote_addr

    # Log all headers for debugging
    logger.debug(f"Request headers: {dict(request.headers)}")

    if forwarded_ips:
        # Extract all IPs from the forwarded header
        all_ips = [ip.strip() for ip in forwarded_ips[0].split(',')]

        # Filter out internal IPs (10.x.x.x)
        external_ips = [ip for ip in all_ips if not ip.startswith('10.')]

        if external_ips:
            ip_address = external_ips[0]  # Use the first external IP
            # Mark as VPN only if there are multiple external IPs
            is_likely_vpn = len(external_ips) > 1
            if is_likely_vpn:
                logger.info(f'Multiple IPs detected: {forwarded_ips}')

    return ip_address, is_likely_vpn

def log_ip_to_file(ip_address, discord_username, is_vpn):
    """Log IP address and Discord username to a file with timestamp"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
        with open('ip_logs.txt', 'a') as f:
            vpn_status = "[VPN DETECTED]" if is_vpn else ""
            f.write(f'[{timestamp}] Discord: {discord_username} - IP: {ip_address} {vpn_status}\n')
    except Exception as e:
        logger.error(f'Error writing to log file: {str(e)}')

@app.route('/', methods=['GET', 'POST'])
def index():
    """Handle main route and log IP address"""
    try:
        if request.method == 'POST':
            discord_username = request.form.get('discord_username')
            if not discord_username:
                return render_template('discord_form.html', error="Discord username is required")

            ip_address, is_vpn = get_client_ip_info()
            logger.info(f'Client IP Address: {ip_address} - Discord: {discord_username} - VPN: {is_vpn}')
            log_ip_to_file(ip_address, discord_username, is_vpn)
            return render_template('index.html')

        return render_template('discord_form.html')
    except Exception as e:
        logger.error(f'Error processing request: {str(e)}')
        return render_template('discord_form.html', error="An error occurred")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)