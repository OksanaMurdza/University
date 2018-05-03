#!/usr/bin/env python
# -*- coding: utf-8 -*-


import urllib2
from bs4 import BeautifulSoup

quote_page = 'http://forum.turizm.ru/common/likbez/aptechka-v-dorogu.html?view=unread#unread'

page = urllib2.urlopen(quote_page)

soup = BeautifulSoup(page, 'html.parser')

body = soup.find('body')

name_author = body.findAll('a', attrs={'class': 'fm-post__author-link fm-post__author-link_no-margin'})
messages_stack = []


all_messages = soup.findAll('div', attrs={'class': 'fm-post__message mq-xs-fm-post__message cmn-editor-content jq-selection-wrap'})


for i in all_messages:
  text = i.get_text()
  print text
