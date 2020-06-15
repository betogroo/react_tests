'use strict';
const randomID = require('crypto-random-string')
const bcrypt = require('bcryptjs')
const slugify = require('slugify')
const { cpf } = require('cpf-cnpj-validator')
const moment = require('moment')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomBirthDate(minYear, maxYear, minMonth, maxMonth, minDay, maxDay) {
  let year = getRandomInt(minYear, maxYear)
  let month = getRandomInt(minMonth, maxMonth)
  let day = getRandomInt(minDay, maxDay)
  return `${year}-${month}-${day}`
}



function getRandomRg() {
  return randomID({ length: 8, type: 'numeric' }).toString()
}


function getRandomGender() {
  const genders = ['M', 'F']
  const randomGender = genders[Math.floor(Math.random() * genders.length)]
  return randomGender
}

function getRandomPeople() {
  let names =
  {
    "M":
      [
        "LUIZ",
        "LUIS",
        "HUMBERTO",
        "CESAR",
        "JOSÉ",
        "HENRIQUE",
        "PASCOAL",
        "BRUNO",
        "TARCÍSIO",
        "CAIQUE",
        "CAIK",
        "GUSTAVO",
        "JOÃO","JOÃO","JOÃO","JOÃO","JOÃO","JOÃO","JOÃO",
        "PAULO",
        "OSVALDO",
        "OLAVO",
        "OLAVIO",
        "OLÍVIO",
        "EUCLIDES",
        "OTÁVIO",
        "SEBASTIÃO",
        "CÁSSIO",
        "CELSO",
        "JULIANO",
        "MARCELO",
        "VANDER",
        "NILTON",
        "VALDIR",
        "WALDIR",
        "ROBERTO",
        "RICARDO",
        "ROGÉRIO",
        "MATEUS",
        "MATHEUS",
        "LUIGI",
        "CARLOS",
        "MÁRCIO",
        "CLODOALDO",
        "ANDRÉ",
        "HUGO",
        "OMAR",
        "ELIÉU",
        "PEDRO",
        "JESUS",
        "FERNANDO",
        "JAIR",
        "MESSIAS",
        "GUILHERME",
        "MARCOS",
        "EVANDRO",
        "FLÁVIO",
        "EDUARDO",
        "JEBERSON",
        "GUSTAVO",
        "ALUÍSIO",
        "ALOISE",
        "RODRIGO",
        "SAID",
        "VINÍCIUS",
        "VINÍCIO",
        "ALEXANDRE",
        "ALECHANDRE",
        "SÉRGIO",
        "WALTER",
        "VALTER",
        "RAFAEL",
        "RAPHAEL",
        "LUCAS",
        "LUCCA",
        "OTRAGANIZ",
        "DANIEL",
        "JUNIOR",
        "LEANDRO",
        "ANDERSON",
        "ASSIS",
        "JOELINGTON",
        "JOEL",
        "JOELSON",
        "JÚLIO",
        "THÉO",
        "TÉO",
        "TEÓFILO",
        "BERNARDO",
        "VICENTE",
        "VALDECI",
        "VALDEMAR",
        "OTAVIANO",
        "CASSIANO",
        "GILVAN",
        "FELIPE",
        "FILIPI",
        "PHILIP",
        "INÁCIO",
        "IGNÁCIO",
        "MAICON",
        "DOUGLAS",
        "DANILO",
        "CLÁUDIO",
        "TARLEI",
        "TACIEL",
        "WILLIAN",
        "MICHEL",
        "MICAEL",
        "MICHAEL",
        "UÓLISON",
        "JORGE",
        "GIAN",
        "GIOVANI",
        "JOÃO LUCAS",
        "DAVI MIGUEL",
        "MIGUEL",
        "LUIS HENRIQUE",
        "LUIZ HENRIQUE",
        "JOÃO PAULO",
        "JOSÉ PAULO",
        "JOSÉ","JOSÉ","JOSÉ","JOSÉ","JOSÉ","JOSÉ","JOSÉ","JOSÉ","JOSÉ","JOSÉ",
        "CAUÃ", "RICRDO", "ÍTALO", "IGOR", "BERNARDO",
        "ARTUR", "ARTHUR", "VÍCTOR", "VÍTOR", "VICTOR HUGO", 
      ],


    "F":
      [
        "VIVIANE",
        "TEOLIDES",
        "GEÓRGIA",
        "CIRLENE",
        "BÁRBARA",
        "ANA",
        "ANA ELISA",
        "ANA CAROLINA",
        "ANA FLÁVIA",
        "ANA BEATRIZ",
        "ANA JÚLIA",
        "ANA LUIZA",
        "JANAINA",
        "NATASHA",
        "CAROLINA",
        "CAROLINE",
        "SOFIA",
        "SOPHIA",
        "BIANCA",
        "SANDRA",
        "CARINA",
        "JAQUELINE",
        "GISLENI",
        "GISELE",
        "GISELI",
        "ADRIANA",
        "LUANA",
        "LUANDA",
        "MARIA","MARIA","MARIA","MARIA","MARIA","MARIA","MARIA",
        "ROBERTA",
        "LUISA",
        "LUIZA",
        "MÁRCIA",
        "RITA",
        "CLÁUDIA",
        "HELENA",
        "MARA",
        "EDILAINE",
        "LETÍCIA",
        "LÍLIAN",
        "CARLA",
        "KARLA",
        "JUSSARA",
        "MANUELA",
        "MANOELA",
        "EMANUELE",
        "MARCELA",
        "JULIANA",
        "ROBERTA",
        "JÚLIA",
        "FLÁVIA",
        "VANESSA",
        "ROSÂNGELA",
        "JOYCE",
        "JOICE",
        "BEATRIZ",
        "FÁTIMA",
        "APARECIDA",
        "CRISTINA",
        "CRISTIANE",
        "LIDIANE",
        "LIDIANI",
        "CARMEM",
        "RAQUEL",
        "EDILAMAR",
        "FERNANDA",
        "CAMILA",
        "PRISCILA",
        "NAIARA",
        "NAYARA",
        "RAFAELA",
        "OLGA",
        "LÚCIA",
        "VALDIRENE",
        "AMÁBILE",
        "JOANA",
        "MARIA PAULA",
        "MARIA LAURA",
        "LAURA",
        "MARIANA",
        "ROGÉRIA",
        "VALENTINA", "ANNE", "TAÍSSA", "ANTÔNIA", "LARISSA", "FABIANA", "TÂNIA", "ZYRA", "CAITLYN", "SONA", "IRÉLIA", "AKALI",
        "CAMILE", "FIORA", "KAISA", "SIVIR", "JANA", "MORGANA", "KAYLE", "LEONA", "LE BLANK"

      ]
  }

  let familyNames =
    [
      "Garcia", "da Silva", "Ferreira", "Melo", "Mello", "Costa", "Nunes", "Pereira", "Monteiro", "Freitas", "Cirilo",
      "Teodoro", "Rodrigues", "Bolsonaro", "da Costa", "dos Anjos", "Silva", "Moraes", "Viana", "Vianna", "Bucioli",
      "Zuviollo", "Aragão", "Piloto", "Vicente", "Gomes", "Gumieiro", "Tancredo", "Salgado", "de Jesus", "Alotonni", "Borges",
      "Mendonza", "Camargo", "Chesca", "Almeida", "da Mata", "Pinto", "Marrone"
    ]

  var gender = getRandomGender()
  let name = names[gender][Math.floor(Math.random() * names[gender].length)]
  let middleName = names[gender][Math.floor(Math.random() * names[gender].length)]
  let familyName = familyNames[Math.floor(Math.random() * familyNames.length)]

  let test = getRandomInt(1, 10)
  if (test % 2 == 0) {
    var fullName = `${name} ${middleName} ${familyName}`
  } else {
    var fullName = `${name} ${familyName}`
  }

  var people = {
    gender: gender,
    fullName: fullName.toUpperCase(),
    email: getRandomEmail(fullName),
    rg: getRandomRg(),
    birthDate: getRandomBirthDate(1936, 2003, 1, 12, 1, 28)
  }

  return people
}

function getRandomEmail(name) {
  let domains =
    [
      "gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "uol.com.br", "terra.com.br", "git.com", "hcode.com", "donateo.com.br", "artemerda.com.br", "lodeloca.com"
    ]

  const signals = ['_', '.', "-"]
  const randomSignals = signals[Math.floor(Math.random() * signals.length)]
  let domain = domains[Math.floor(Math.random() * domains.length)]
  let nameArray = name.split(' ')
  let newName = nameArray.slice(0, 1) + ' ' + nameArray.slice(nameArray.length - 1)
  let email = `${slugify(newName, { lower: true, replacement: randomSignals })}${getRandomInt(1, 99)}@${domain}`
  return email
}

var data = []

for (let i = 0; i < 100; i++) {
  var people = getRandomPeople()
  var name = people.fullName
  var email = people.email
  var rg = people.rg
  var birthDate = people.birthDate
  var gender = people.gender
  if (i === 0) {
    var idRole = 100
  } else if (i === 1 || i === 2) {
    var idRole = 50
  } else {
    var idRole = 10
  }


  data[i] = {
    id: randomID({ length: 8, type: 'url-safe' }),
    name: name,
    rg: rg,
    cpf: cpf.generate(),
    password: bcrypt.hashSync(rg, 10),
    email: email,
    birthDate: birthDate,
    gender: gender,
    idRole: idRole,
    createdAt: new Date(),
    updatedAt: new Date()
  }

}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Users',

        data

        , {})
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }

  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Users', null, {})
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
};
