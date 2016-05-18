'use strict'

import assert from 'assert'
import apply from '../lib/apply'

describe('apply', () => {

  it('returns the patch argument if it\'s not an object', () => {
    [true, false, null, [], 42, 'foo'].forEach((v) => {
      assert.equal(apply({}, v), v)
    })
  })

  it('returns an object if document argument is not an object', () => {
    [true, false, null, [], 42, 'foo'].forEach((v) => {
      const doc = apply(v, {})
      assert.equal(typeof doc, 'object')
      assert(doc !== null)
    })
  })

  it('deletes patch properties with value null', () => {
    let doc = {"foo": "bar"}
    doc = apply(doc, {"foo": null})
    assert.deepEqual(doc, {})
  })

  it('deletes nested patch properties with value null', () => {
    let doc = {"foo": {"bar": "foo"}}
    doc = apply(doc, {"foo": {"bar": null}})
    assert.deepEqual(doc, {"foo": {}})
  })

  it('adds patch properties with non null value', () => {
    let doc = {}
    const patch = {"foo": "bar", "bar": "foo"}
    doc = apply(doc, patch)
    assert.deepEqual(doc, patch)
  })

  it('adds nested patch properties with non null value', () => {
    let doc = {}
    const patch = {"foo": {"bar": "foo"}}
    doc = apply(doc, patch)
    assert.deepEqual(doc, patch)
  })

})
