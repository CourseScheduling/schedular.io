function Model () {

}

Model.prototype.get = function (endpoint, data) {
  var _get = '?'

  for (var key in data) {
    _get += (key + '=' + data[key] + '&')
  }

  _get = _get.slice(0,-1)

  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest()
    request.open('GET', endpoint + _get, true)

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        try {
          var data = JSON.parse(request.responseText)
          resolve(data)
        } catch (e) {
          resolve(request.responseText)
        }
      } else {
        reject(request.responseText)
      }
    }

    request.onerror = function() {
      reject(request)
    }
    request.send()
  })

}

Model.prototype.post = function (endpoint, data) {
  var _post = ''

  for (var key in data) {
    _post += (key + '=' + data[key] + '&')
  }

  _post = _post.slice(0,-1)

  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest()
    request.open('POST', endpoint + _post, true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        try {
          var data = JSON.parse(request.responseText)
          resolve(data)
        } catch (e) {
          resolve(request.responseText)
        }
      } else {
        reject(request.responseText)
      }
    }
    request.onerror = function() {
      reject(request)
    }
    request.send(_post)
  })
}

// Notes: 
// Since we're using Promises, remember to poyfill them.