#!/usr/bin/env python
# -*- coding: utf-8 -*-


import urllib2
from bs4 import BeautifulSoup
from db import insert

quote_page = 'http://forum.turizm.ru/common/likbez/aptechka-v-dorogu.html?view=unread#unread'

page = urllib2.urlopen(quote_page)

body = BeautifulSoup(page, 'html.parser').find('body')

all_name_author = body.findAll('a', attrs={'class': 'fm-post__author-link fm-post__author-link_no-margin'})
all_messages = body.findAll('div', attrs={'class': 'fm-post__message mq-xs-fm-post__message cmn-editor-content jq-selection-wrap'})

comments = []
for indx, msg in enumerate(all_messages):
  comment = {
    'author': all_name_author[indx].getText(),
    'text': msg.get_text()
  }
  comments.append(comment)

insert(comments)
