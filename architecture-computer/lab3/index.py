# -*- coding: utf-8 -*-

from pymongo import MongoClient
import pymorphy2

from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import TfidfVectorizer

morph = pymorphy2.MorphAnalyzer()


client = MongoClient('mongodb://localhost:27017/')
comments = client.laba.comments



def get():
  normal_form_comments = []
  table = {ord(char): None for char in ';,.!?:~)([]\'"`\{\}-_/&@*^%$#'}
  for comment in comments.find():
    normal_forms = []
    for word in comment['text'].strip().lower().translate(table).split(' '):
      p = morph.parse(word)[0]
      # print word
      # print p.tag
      # print p.normal_form
      # if p.normal_form not in stop_words:
      normal_forms.append(p.normal_form)
    normal_form_comments.append(' '.join(normal_forms))


  stop = ['стороной']
  vectorizer = TfidfVectorizer(stop_words=stop)
  r = vectorizer.fit_transform(normal_form_comments)
  # векторизация 
  # print r

  km = KMeans(n_clusters=8)
  result = km.fit(r)
  order_centroids = km.cluster_centers_.argsort()[:, ::-1]
  terms = vectorizer.get_feature_names()
  for i in range(result.n_clusters):
    print 'Cluster {}'.format(i)
    for ind in order_centroids[i, :10]:
      print '\t{}'.format(terms[ind].encode('utf-8'))
    print ' '

get()