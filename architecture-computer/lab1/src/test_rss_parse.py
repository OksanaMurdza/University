import unittest
from helper import read_xml_file, rss_parse, print_to_file


class read_xml_file_test(unittest.TestCase):
  # parse normal xml-file

  def read_normal_xml_file(self):
    result = read_xml_file()
    save_urls = ['https://www.scorespro.com/rss/live-soccer.xml',
                'https://www.scorespro.com/rss2/live-soccer.xml',
                'http://feeds.feedburner.com/scorespro']

    self.assertEqual(save_urls, result)

