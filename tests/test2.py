import unittest
import requests

class VerEstadisticas(unittest.TestCase):
    invalid_input = None
    base_url = "http://localhost:5000/record/getStats/"

    @classmethod
    def setUpClass(cls):
        cls.invalid_input = {
            'tipo': '',
            'rango': ''

        }

        cls.search_by_year = {
            'tipo': 'Año',
            'rango': '2024'
        }

        cls.search_by_week = {
            'tipo': 'Semana',
            'rango': '2024-01-01T03:00:00.000Z'
        }

        cls.search_by_day = {
            'tipo': 'Dia',
            'rango': '2024-03-10T07:00:00.000Z'
        }

        cls.search_by_month = {
            'tipo': 'Mes',
            'rango': '2024-04'
        }
    
    
    @classmethod
    def tearDownClass(cls):
        del cls.invalid_input
        del cls.search_by_year

    def test_get_by_year(self):
        res = requests.get(self.base_url, params=self.search_by_year)
        stats = res.json()
        stats_esperados = {
            "Radiografia": 4,
            "Resonancia Magnética": 2,
            "Ecografías": 1,
            "Tomografías (TAC)": 2
        }
        self.assertEqual(stats_esperados, stats)

    def test_get_by_week(self):
        res = requests.get(self.base_url, params=self.search_by_week)
        stats = res.json()
        stats_esperados = {
            "Radiografia": 3,
            "Resonancia Magnética": 2,
            "Ecografías": 1,
            "Tomografías (TAC)": 2
        }
        self.assertEqual(stats_esperados, stats)

    def test_get_by_day(self):
        res = requests.get(self.base_url, params=self.search_by_day)
        stats = res.json()
        stats_esperados = {
            "Radiografia": 0,
            "Resonancia Magnética": 0,
            "Ecografías": 0,
            "Tomografías (TAC)": 0
        }
        self.assertEqual(stats_esperados, stats)

    def test_get_by_month(self):
        res = requests.get(self.base_url, params=self.search_by_month)
        stats = res.json()
        stats_esperados = {
            "Radiografia": 2,
            "Resonancia Magnética": 1,
            "Ecografías": 1,
            "Tomografías (TAC)": 2
        }
        self.assertEqual(stats_esperados, stats)

    def test_invalid_search(self):
        res = requests.get(self.base_url, params=self.invalid_input)
        stats = res.json()
        stats_esperados = {
            "Radiografia": 0,
            "Resonancia Magnética": 0,
            "Ecografías": 0,
            "Tomografías (TAC)": 0
        }
        self.assertEqual(stats_esperados, stats)

    def test_post_method(self):
        res = requests.post(self.base_url, params=self.invalid_input)
        self.assertEqual("404", str(res.status_code))

if __name__ == '__main__':
    unittest.main()
