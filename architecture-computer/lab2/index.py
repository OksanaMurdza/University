#!/usr/bin/env python
# -*- coding: utf-8 -*-


import urllib2
from bs4 import BeautifulSoup
from db import insert

quote_page1 = 'http://forum.turizm.ru/common/likbez/aptechka-v-dorogu.html?view=unread#unread'
quote_page2 = 'http://forum.turizm.ru/common/likbez/gde-otdohnut-v-iyune.html?view=unread#unread'
quote_page3 = 'http://forum.turizm.ru/common/likbez/kak-sebya-vesti-s-obezyanami.html?view=unread#unread'

def parse(quote_page, topic):
  page = urllib2.urlopen(quote_page)

  body = BeautifulSoup(page, 'html.parser').find('body')

  all_name_author = body.findAll('a', attrs={'class': 'fm-post__author-link fm-post__author-link_no-margin'})
  all_messages = body.findAll('div', attrs={'class': 'fm-post__message mq-xs-fm-post__message cmn-editor-content jq-selection-wrap'})
  all_dates = body.findAll('span', attrs={'class': 'fm-post__date mq-xs-fm-post__date'})


  comments = []
  for indx, msg in enumerate(all_messages):
    comment = {
      'author': all_name_author[indx].getText(),
      'text': msg.get_text(),
      'date': all_dates[indx].getText(),
      'topic': topic
    }
    comments.append(comment)

  insert(comments)

parse(quote_page1, 'туризм')
parse(quote_page2, 'відпочинок')
parse(quote_page3, 'поведінка')

