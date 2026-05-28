#!/usr/bin/env python3
import http.server, socketserver

PORT = 8765
DIRECTORY = "/Users/ronzinanina/Documents/Portfolio Site/Personal Portfolio"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    def log_message(self, format, *args):
        pass

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
