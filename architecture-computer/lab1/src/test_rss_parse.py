import unittest
from helper import *


def test_read_xml_files():
    save_urls = [
        'https://www.scorespro.com/rss/live-soccer.xml',
        'https://www.scorespro.com/rss2/live-soccer.xml',
        'http://feeds.feedburner.com/scorespro'
    ]
    assert read_xml_file() == save_urls


def test_print_to_files(fileName):
    data = "test string"
    print_to_file(fileName, data, 'w')
    f = open(fileName, "r")
    fileData = f.read().strip()
    assert data == fileData


def test_del_file(fileName):
    del_file(fileName)
    try:
        f = open(fileName, "r")
    except IOError:
        assert True


def test_score_process():
    srcString = "#Livescore: (SUI-CHL) #Rapperswil vs #FCWinterthur: 1-1"
    expectedResult = "#Rapperswil vs #FCWinterthur: 1-1"
    result = score_process(srcString)
    assert result == expectedResult


def test_rss_parse():
    url = 'http://localhost:2999/lab_xml.xml'
    result = rss_parse(url)
    expectedResult = [
        u'#JongAjax vs #NECNijmegen: 1-0',
        u'#BrayWanderers vs #ShamrockRovers: 0-0',
        u'#CurzonAshton vs #Nuneaton: 0-0',
        u'#DerryCity vs #Bohemians: 0-0',
        u'#Reggiana vs #BassanoVirtus: 0-0',
        u'#StPatricksAth vs #WaterfordUnited: 0-0',
        u' vs #Lorient: 0-0',
        u'#BeitarJerusalem vs #MaccabiTelAviv: 3-1',
        u'#Osmanlispor vs #Trabzonspor: 3-3']
    assert result == expectedResult


testFileName = "test_file.xml"
test_read_xml_files()
test_print_to_files(testFileName)
test_del_file(testFileName)
test_score_process()
test_rss_parse()
