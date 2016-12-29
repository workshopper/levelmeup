function formatNew (diff) {
  return '{diff.unexpected}: ' + diff.path.join('.')
}

function formatDeleted (diff) {
  return '{diff.missing}: ' + diff.path.join('.')
}

function formatEdited (diff) {
  return '{diff.expected} `' + (diff.path.join('.') || 'result') + '` {diff.expected_tobe} \n\n```\n' + JSON.stringify(diff.lhs, null, 2) + '\n```\n{diff.expected_got}\n```\n' + JSON.stringify(diff.rhs, null, 2) + '```\n\n'
}

function formatArray (diff) {
  diff.item.path = [diff.path.join('.') + '[' + diff.index + ']']
  return formatChange(diff.item)
}

function formatChange (diff) {
  if (!diff.path) {
    diff.path = []
  }
  if (diff.kind === 'N') {
    return formatNew(diff)
  }
  if (diff.kind === 'D') {
    return formatDeleted(diff)
  }
  if (diff.kind === 'E') {
    return formatEdited(diff)
  }
  if (diff.kind === 'A') {
    return formatArray(diff)
  }
  return ''
}

function formatChanges (changes) {
  return changes.map(formatChange).join('\n')
}

module.exports = function (diffs) {
  return '\n\n' + formatChanges(diffs) + '\n'
}
