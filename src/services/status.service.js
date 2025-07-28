const statusMap = new Map();

function setStatus(mensagemId, status) {
  statusMap.set(mensagemId, status);
}

function getStatus(mensagemId) {
  return statusMap.get(mensagemId);
}

module.exports = { setStatus, getStatus };
