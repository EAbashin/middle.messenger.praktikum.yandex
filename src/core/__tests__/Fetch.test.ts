import sinon from 'sinon';
import Fetch from '../Fetch';

describe('Fetch', () => {
  it('should return get request', () => {
    const requests: Array<sinon.SinonFakeXMLHttpRequest> = [];
    const xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = ((request: any) => requests.push(request));

    Fetch.get('/');
    const [request] = requests;

    expect(request.method).toEqual('GET');
  });

  it('should return post request', () => {
    const requests: Array<sinon.SinonFakeXMLHttpRequest> = [];
    const xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = ((request: any) => requests.push(request));

    Fetch.post('/', {});
    const [request] = requests;

    expect(request.method).toEqual('POST');
  });

  it('should return put request', () => {
    const requests: Array<sinon.SinonFakeXMLHttpRequest> = [];
    const xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = ((request: any) => requests.push(request));

    Fetch.put('/', {});
    const [request] = requests;

    expect(request.method).toEqual('PUT');
  });

  it('should return delete request', () => {
    const requests: Array<sinon.SinonFakeXMLHttpRequest> = [];
    const xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = ((request: any) => requests.push(request));

    Fetch.delete('/', {});
    const [request] = requests;

    expect(request.method).toEqual('DELETE');
  });
});
