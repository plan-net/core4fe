import MockAdapter from 'axios-mock-adapter'
import saAxios from './axios.mock.instance'

const client = {
  '_id': '4130edb65adb11e98647d663bd873d93',
  'name': 'Client 1',
  'etag': 'a14395559ab44fc997034c4528a9eef1',
  'author': 'eha',
  'timestamp': '2019-01-21T10:02:51.521000',
  'start': '2014-12-29T00:00:00',
  'end': '2019-12-23T00:00:00',
  'data': {
    'timestamp': '2019-01-21T10:02:51.520000',
    'dataframe': {},
    'uploaded': '2019-01-21T10:02:51.520000',
    'filename': 'clientdata_PickUP_v06.xlsx'
  }
}
const clients = [
  {
    '_id': '4130edb65adb11e98647d663bd873d93',
    'name': 'Client1',
    'etag': '76c22390-d50b-4dad-9e73-6cf365a09daa',
    'timestamp': '2019-01-21T10:02:51.521000',
    'author': 'eha'
  },
  {
    '_id': '4130edb65adb11e98647d663bd871548',
    'name': 'Client2',
    'etag': '76c22390-d50b-4dad-9e73-6cf365a09daa',
    'timestamp': '2019-04-30T16:02:51.521000',
    'author': 'lst'
  },
  {
    '_id': '4130edb65adb11e98647d663xxxx4587',
    'name': 'Client3',
    'etag': '76c22390-d50b-4dad-9e73-6cf365a09daa',
    'timestamp': '2019-04-30T17:20:51.521000',
    'author': 'wic'
  }
]

const clientModels = [
  {
    'name': 'Bahlsen Model 1',
    '_id': '1234556',
    'etag': '5adb-11e9-8647',
    'public': true,
    'data': {
      'modelling_start': '2008-05-04 14:28:03',
      'modelling_end': '2017-09-04 14:28:03',
      'variables': [
        {
          'long_name': 'Woche',
          'type': 'TIME',
          'user': true,
          'short_name': 'week',
          'visible': true
        }
      ]
    }
  },
  {
    'name': 'Bahlsen Model 2',
    '_id': '1234ydsjnkshf56',
    'etag': '5adb-114ydsjnkse9-8647',
    'public': false,
    'data': {
      'modelling_start': '2012-05-04 15:28:03',
      'modelling_end': '2019-05-04 15:28:03',
      'variables': [
        {
          'long_name': 'Woche',
          'type': 'TIME',
          'user': true,
          'short_name': 'week',
          'visible': true
        }
      ]
    }
  }
]
const clientScenarios =
  [{
    'author': 'eha',
    'timestamp': '2019-01-17T15:32:02.235000',
    'name': 'Scenario 1',
    'start': '2018-01-01T00:00:00',
    'end': '2019-12-23T00:00:00',
    'etag': '25d28d62-578f-483b-8fe6-2fd1f64d7ec7',
    'client': '4130edb6-5adb-11e9-8647-d663bd873d93',
    'model': '1234ydsjnkshf56',
    '_id': '5c458c7522f10738ed1b24cfad'
  },
  {
    'author': 'eha',
    'timestamp': '2019-02-19T15:32:02.235000',
    'name': 'Scenario 2',
    'start': '2018-01-01T00:00:00',
    'end': '2019-12-23T00:00:00',
    'etag': '25d28d62-578f-483b-8fe6-2fd1f64d7ec7',
    'client': '4130edb6-5adb-11e9-8647-d663bd873d93',
    'model': '1234556',
    '_id': '5c458c75f10738ed1b24cf11d'
  }
  ]

const mock = new MockAdapter(saAxios, { delayResponse: 200 })
// Mock any GET request to /users
// arguments for reply are (status, data, headers)
// mock.onGet(CLIENTS).reply(200, clients)
mock.onGet('clients').reply(function (config) {
  return [200, clients]
})

mock.onGet(/clients\/[a-zA-Z0-9_]+$/).reply(function (config) {
  return [200, client]
})

mock.onGet(/clients\/[a-zA-Z0-9_]+\/models$/).reply(200, clientModels)

mock.onPost('clients').reply(function (config) {
  return [200, {
    '_id': '4130edb65adb11e9-8647d663xxyx4587',
    'name': 'Client4',
    'etag': '76c22390-d50b-4dad-9e73-6cf365a09daa',
    'timestamp': '2019-04-30T17:20:51.521000',
    'author': 'mmr'
  }]
})
mock.onPost(/clients\/[a-zA-Z0-9_]+\/models/).reply(function (config) {
  const response = JSON.parse(config.data)
  response._id = Math.random()
  response.etag = Math.random()
  return [200, response]
})
// TODO regex
mock.onPut(/clients\/[a-zA-Z0-9_]+$/).reply(200, client)

mock.onDelete(/clients\/[a-zA-Z0-9_]+$/).reply(200, { success: true })

mock.onPut(/clients\/[a-zA-Z0-9_]+\/models\/[a-zA-Z0-9_]+$/).reply(200, clientModels[0])

mock.onDelete(/clients\/[a-zA-Z0-9_]+\/models\/[a-zA-Z0-9_]+$/).reply(200, { success: true })

// scenarios
mock.onGet(/clients\/[a-zA-Z0-9_]+\/scenarios$/).reply(200, clientScenarios)
mock.onPost(/clients\/[a-zA-Z0-9_]+\/scenarios$/).reply(function (config) {
  const data = JSON.parse(config.data)
  const ret = Object.assign(
    {
      '_id': '4130edb65adb11es9-8647d663xxyx4587',
      'etag': '76c2239s0-d50b-4dad-9e73-6cf365a09daa',
      'timestamp': '2019-04-30T17:20:51.521000',
      'author': 'mmr'
    },
    data
  )
  return [200, ret]
})
