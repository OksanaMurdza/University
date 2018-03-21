import xml.etree.ElementTree as ET
from dicttoxml import dicttoxml
import feedparser
import re


def read_xml_file():
  tree = ET.parse('url.xml')
  root = tree.getroot()

  parsed_url = []

  for child in root:
    buff = child.attrib
    parsed_url.append(buff["url"])
  
  return parsed_url


def score_process(string):
    regex = r"#{0,1}([A-z])*\svs\s#{0,1}([A-z])*: \d{1,2}-\d{1,2}"
    matches = re.finditer(regex, string)
    res = ''

    for matchNum, match in enumerate(matches):
        res = match.group()

    return res


def rss_parse(url):
  d = feedparser.parse(url)
  news = d['entries']
  res = []

  for new in news:
    news_tags = [new['title'], new['description']]
    for tags in news_tags:
      parsed = score_process(tags)
      if parsed != '':
        res.append(parsed)
  return res

def print_to_file(data):
  fh = open("result.xml","a")
  fh.write(data)
  fh.write('\n')  
  fh.close()