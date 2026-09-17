import os
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(Path(__file__).parent / ".env")
db = MongoClient(os.environ["MONGO_URL"])[os.environ["DB_NAME"]]

doc = {
    "key": "place",
    "name": "Dra. Luzia de Cassia Nishida",
    "brand": "Nishida Advocacia",
    "category": "Advocacia",
    "oab": "OAB/SP 231.637",
    "tagline": "Rigor técnico, discrição e atendimento verdadeiramente personalizado em Direito de Família, Sucessões e Direito Cível.",
    "portrait": "/assets/profile.jpg",
    "about": [
        "À frente do Nishida Advocacia, a Dra. Luzia de Cassia Nishida conduz cada caso de forma artesanal — do primeiro atendimento à sentença — com atuação reconhecida em Direito de Família, Sucessões e Direito Cível.",
        "Inscrita na OAB/SP sob o nº 231.637, construiu sua prática sobre três pilares: rigor técnico, comunicação clara com o cliente e a busca pelo melhor desfecho possível — com atendimento presencial em Atibaia/SP e online para toda a região.",
    ],
    "values": [
        {"num": "01", "title": "Rigor Técnico", "text": "Cada caso é estudado em profundidade: jurisprudência atualizada, estratégia processual clara e peças construídas com precisão — nada de fórmulas prontas."},
        {"num": "02", "title": "Atendimento Sob Medida", "text": "Você fala diretamente com a advogada responsável pelo seu caso. Prazos, riscos e caminhos possíveis explicados em linguagem simples, do início ao fim."},
        {"num": "03", "title": "Ética & Resultados", "text": "Sigilo absoluto, expectativas reais e atuação firme. A confiança do cliente é tratada como o bem mais valioso do escritório."},
    ],
    "practiceAreas": [
        {"icon": "Users", "title": "Direito de Família", "desc": "Divórcio, guarda de filhos, pensão alimentícia, união estável e regulamentação de convivência familiar."},
        {"icon": "ScrollText", "title": "Sucessões e Inventário", "desc": "Inventários judiciais e extrajudiciais, partilha de bens, testamentos e planejamento sucessório."},
        {"icon": "Shield", "title": "Curatela e Interdição", "desc": "Proteção judicial de idosos e pessoas vulneráveis, com nomeação de curadores e prestação de contas."},
        {"icon": "Scale", "title": "Direito Cível e Indenizações", "desc": "Ações de indenização por danos materiais e morais, cobranças e responsabilidade civil em geral."},
        {"icon": "FileText", "title": "Contratos e Preventivo", "desc": "Elaboração e revisão de contratos, pareceres e assessoria preventiva para evitar litígios futuros."},
        {"icon": "Handshake", "title": "Mediação e Acordos", "desc": "Composição de conflitos por negociação e mediação, buscando soluções mais rápidas e menos desgastantes."},
    ],
    "address": None,
    "city": "Atibaia - SP",
    "phone": "+55 11 99988-4833",
    "whatsapp": "5511999884833",
    "hours": None,
    "mapQuery": None,
    "rating": None,
    "reviewsCount": 0,
    "reviews": [],
    "gallery": ["/assets/g1.jpg", "/assets/g2.jpg", "/assets/g3.jpg", "/assets/g4.jpg", "/assets/g5.jpg", "/assets/g6.jpg"],
}

db.site_data.replace_one({"key": "place"}, doc, upsert=True)
print("seeded:", db.site_data.find_one({"key": "place"})["name"])
