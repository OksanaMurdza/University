# -*- coding: utf-8 -*- 

from helper import read_xml_file, rss_parse, print_to_file
from dicttoxml import dicttoxml

        
rss_urls = read_xml_file()

for url in rss_urls:
    xml = dicttoxml(rss_parse(url), custom_root = 'test', attr_type = False)
    print_to_file(xml)
