import unittest
import requests
from pymongo import MongoClient
from bson import ObjectId


class VerHoraTest(unittest.TestCase):
    invalid_input = None
    search_existing_id = None
    base_url = "http://localhost:5000/record/getHora/"

    @classmethod
    def setUpClass(cls):
        cls.bd_client = MongoClient("mongodb+srv://sebastianarrieta123:bdpass@proyectobd.4f2owgn.mongodb.net/")
        cls.bd = cls.bd_client['test']
        cls.tabla = cls.bd['horas']
        cls.test_id = ObjectId()

        cls.test_hora = {
        "_id": cls.test_id,
        "apellido": "arrieta",
        "fechaHora": "2024-04-21T12:30:00.000Z",
        "nombre": "sebastian",
        "nombreMedico": "ewfwef",
        "observacionExamen": "wgqwgwqg",
        "rut": 123456789,
        "tipoExamen": "Radiografía",
        "__v": 0
        }

        cls.tabla.insert_one(cls.test_hora)

        cls.invalid_input = {
            'id': ''     #El id debe tener un largo específico por lo que este se considera invalido
        }

        cls.search_existing_id = {
            'id': str(cls.test_id)
        }
    
    @classmethod
    def tearDownClass(cls):
        del cls.invalid_input
        del cls.search_existing_id
        cls.tabla.delete_one({"_id": cls.test_id})

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
            "_id": str(self.test_id)
        }
        self.assertEqual(hora_esperada, hora)

    def test_invalid_search(self):
        res = requests.get(self.base_url, params=self.invalid_input)
        hora = res.json()['message']
        self.assertEqual("Error obteniendo la hora", hora)

if __name__ == '__main__':
    unittest.main()
