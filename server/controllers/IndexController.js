const passport = require('passport')
const { validationResult } = require('express-validator')
const randomID = require('crypto-random-string')
const bcrypt = require('bcryptjs')
const { cpf } = require('cpf-cnpj-validator')
const slugify = require('slugify')

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
  return randomID({ length: 8, type: 'numeric' })
}


function getRandomGender() {
  var genders = ['M', 'F']
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
        "JOÃO",
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
        "JOSÉ PAULO"
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
        "MARIA",
        "ROBERTA",
        "LUISA",
        "LUIZA",
        "MÁRCIA",
        "RITA",
        "CLÁUDIA",
        "HELENA",
        "MARA",
        "EDILAIEN",
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
        "ROGÉRIA"

      ]
  }

  let familyNames =
    [
      "Garcia", "da Silva", "Ferreira", "Melo", "Mello", "Costa", "Nunes", "Pereira", "Monteiro", "Freitas", "Cirilo",
      "Teodoro", "Rodrigues", "Bolsonaro", "da Costa", "dos Anjos", "Silva", "Moraes", "Viana", "Vianna", "Bucioli",
      "Zuviollo", "Aragão", "Piloto", "Vicente", "Gomes", "Gumieiro", "Tancredo", "Salgado", "de Jesus", "Alotonni", "Borges",
      "Mendonza", "Camargo", "Chesca", "Almeida"
    ]

  var gender = getRandomGender()
  let name = names[gender][Math.floor(Math.random() * names[gender].length)]
  let middleName = names[gender][Math.floor(Math.random() * names[gender].length)]
  let familyName = familyNames[Math.floor(Math.random() * familyNames.length)]

  let test = getRandomInt(1, 10)
  if (test % 2 == 0) {
    var fullName = `${name} ${middleName} ${familyName}`
  } else {
    var fullName = `${name}  ${familyName}`
  }

  var people = {
    gender: gender,
    fullName: fullName.toUpperCase(),
    email: getRandomEmail(fullName)
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
  let email = `${slugify(newName, { lower: true, replacement: randomSignals })}@${domain}`
  return email
}
class IndexController {

  //GET    
  index(req, res) {
    res.render("index.ejs");

  }
  test(req, res) {
    var data = []

    for (let i = 0; i < 10; i++) {
      var people = getRandomPeople()
      var name = people.fullName
      var email = people.email
      var gender = people.gender

      data[i] = {
        id: randomID({ length: 8, type: 'url-safe' }),
        name: name,
        rg: getRandomRg(),
        cpf: cpf.generate(),
        password: bcrypt.hashSync('11111111', 10),
        email: email,
        birthDate: getRandomBirthDate(1936, 2003, 1, 13, 1, 28),
        gender: gender,
        idRole: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    }
    res.json(data)

  }

  logout(req, res) {

    req.logout()
    req.flash('success', 'Você saiu com segurança!')
    res.redirect('/')

  }

  // POST
  post(req, res) {
    var { id, email, password } = req.body

    const errors = validationResult(req).array();
    var error = []
    if (errors.length > 0) {

      errors.forEach(element => {
        error.push(element.msg)
      });


      req.flash('error', `${errors.length} erros: ${error.join(', ')}`)
      res.redirect('/')
    } else {

      var data = { id, email, password }
      res.json(data)
    }
  }

  auth(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/',
      badRequestmessage: 'tudo errado',
      failureFlash: true
    })(req, res, next)
  }


}

module.exports = new IndexController