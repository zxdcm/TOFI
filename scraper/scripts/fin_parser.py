import sys

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import traceback
from collections import namedtuple

from scripts.data import FIN_SOURCE_LINKS, CURRENCY

Rate = namedtuple("rates", ["currency", "terms", "percents", "rate"])

chrome_options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=chrome_options)


def get_deposit_info(link, category):
    driver.get(link)
    try:
        name = WebDriverWait(driver, 120).until(EC.presence_of_element_located((By.TAG_NAME, "h1"))).text
        bank = (driver.find_element_by_css_selector("div[class*='header-bank-top__img']")
                .find_element_by_tag_name("a").get_attribute("href"))
        rate = driver.find_element_by_class_name("deposit-short-info__info-cell--rate").find_element_by_tag_name("span").text
        currency = driver.find_element_by_class_name("deposit-short-info__info-cell--currency").find_element_by_tag_name("span").text
        term = driver.find_element_by_class_name("deposit-short-info__info-cell--time").find_element_by_tag_name(
            "span").text
        amount = driver.find_element_by_class_name("deposit-short-info__info-cell--amount").find_element_by_tag_name(
            "span").text

        conditions = [elem.text for elem in
                      driver.find_element_by_class_name("list--check ").find_elements_by_tag_name("li")]
        add_conditions = ""
        rates = []
        try:
            add_conditions = (driver.find_element_by_xpath("//div[@class='deposits-full-info__panel-2-in-left']/p")
                              .get_attribute("innerHTML") + "\n")
        except Exception:
            pass

        try:
            add_conditions += (
                driver.find_elements_by_xpath("//div[@class='deposits-full-info__panel-2-in-left']/ul")[1]
                .get_attribute("innerText"))
        except Exception:
            pass

        name, bank, clean_amounts, conditions, add_conditions = \
            clean_data(name, bank, rate, term, amount, conditions, add_conditions)

        if "от" in rate:
            trs = driver.find_element_by_class_name("deposit-rates--desc").find_elements_by_tag_name("tr")
            terms = [elem.text for elem in trs[0].find_elements_by_tag_name("th")[1:]]
            percents = [elem.text for elem in trs[1].find_elements_by_tag_name("th")[1:]]

            try:
                lis = driver.find_element_by_id("deposit-rate-tabs").find_elements_by_tag_name("a")
                if len(lis) > 1:
                    for li in lis:
                        li.click()
                        time.sleep(5)

                        data = driver.find_element_by_id(li.get_attribute("href").split("#")[1])
                        terms = []
                        for elem in data.find_elements_by_tag_name("th")[1:]:
                            if "мес" in elem.text:
                                terms.append(int(elem.text.replace(" мес.", "")) * 30)
                            else:
                                terms.append(int(elem.text.replace(" дн.", "")) * 30)

                        percents = [float(elem.text.replace("%", "")) for elem in data.find_elements_by_tag_name("td")[1:]]
                        rate = int("".join(data.find_element_by_tag_name("td").text.split()[1:-1]))
                        rates.append(Rate(li.text, terms, percents, rate))
                print("Rates", rates)
            except Exception as e:
                exc_info = sys.exc_info()
                print("e", e, traceback.format_exception(*exc_info, limit=3))
                print("Terms", terms, percents)
                pass
        print(name, bank, clean_amounts if not rates else None, conditions, add_conditions, category)
        return name, bank, clean_amounts if not rates else None, conditions, add_conditions, category
    except Exception as e:
        exc_info = sys.exc_info()
        print("ex", e, traceback.format_exception(*exc_info, limit=3))


def clean_data(name, bank, rate, term, amount, conditions, add_conditions):
    name = name.replace("Вклад ", "").strip()
    bank = bank.split("/")[-1].strip()
    rate = rate.replace("%", "").strip() if type(rate) != int else rate
    try:
        term = int(term.replace("дн.", "").strip()) if "дн." in term else int(term.replace("мес.", "").strip()) * 30
    except Exception:
        pass

    amounts = amount.split(",")
    clean_amounts = []
    for amount in amounts:
        for key in CURRENCY.keys():
            if key in amount:
                clean_amounts.append(Rate(CURRENCY[key], term, rate, amount.replace(key, "").replace(" ", "")))

    return name, bank, clean_amounts, conditions, add_conditions


def run():
    links = []
    for source in FIN_SOURCE_LINKS.keys():

        for page in range(0, 10):
            driver.get(FIN_SOURCE_LINKS[source] + str(page))
            local_links = WebDriverWait(driver, 120).until(EC.presence_of_all_elements_located(
                (By.CSS_SELECTOR, "a[href*='/bank/']")))
            links.extend([{'link': elem.get_attribute("href"), "category": source} for elem in local_links])

    for link in links:
        deposit = get_deposit_info(link['link'], link['category'])


