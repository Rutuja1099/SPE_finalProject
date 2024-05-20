import unittest
import requests
import json
from app import app

class TestBackend(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_hello(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(data, "hello")

#    def test_video(self):
#        with open('sample_video.mp4', 'rb') as video_file:
#            video_data = video_file.read()
#        response = self.app.post('/video', data=video_data, content_type='application/octet-stream')
#        self.assertEqual(response.status_code, 200)
#        self.assertEqual(response.data.decode('utf-8'), "Video read")


if __name__ == '__main__':
    unittest.main()

