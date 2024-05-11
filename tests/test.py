import unittest
import requests

class VerHoraTest(unittest.TestCase):
    invalid_input = None
    base_url = "http://localhost:5000/record/getHora/"

    @classmethod
    def setUpClass(cls):
        cls.invalid_input = {
            'id': ''
        }

        cls.search_existing_id = {
            'id': '6625b40078ccd1c959709ff2'
        }
    
    @classmethod
    def tearDownClass(cls):
        del cls.invalid_input
        del cls.search_existing_id

    def test_get_existing_id(self):
        res = requests.get(self.base_url, params=self.search_existing_id)
        hora = res.json()
        hora_esperada = {
            "apellido": "arrieta",
            "fechaHora": "2024-04-21T12:30:00.000Z",
            "nombre": "sebastian",
            "nombreMedico": "ewfwef",
            "observacionExamen": "wgqwgwqg",
            "rut": 123456789,
            "tipoExamen": "Radiografía",
            "__v": 0,
            "_id": "6625b40078ccd1c959709ff2"
        }
        self.assertEqual(hora_esperada, hora)

    def test_invalid_search(self):
        res = requests.get(self.base_url, params=self.invalid_input)
        hora = res.json()['message']
        self.assertEqual("Error obteniendo la hora", hora)

if __name__ == '__main__':
    unittest.main()
