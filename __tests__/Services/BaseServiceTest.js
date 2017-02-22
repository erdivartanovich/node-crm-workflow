'use strict'

const basePath = '../../src'
const BaseService = require(basePath + '/Services/BaseService')
var tracker = require('mock-knex').getTracker()

const testClass = new BaseService()
/**
 * should test the base-service against specifif table name, 
 * because base-service's table name is null by default
 */
testClass.tableName = 'person_family'
const tableName = testClass.tableName

describe('====== BaseServiceTest ========', () => {

    before(() => {
        tracker.install()

        tracker.on('query', function checkResult(query) {
            query.response(query)
        })
    })

    after(() => {
        tracker.uninstall()
    })

    describe('#browse()' , () => {
        it('should return a valid query', (done) => {
            const query = 'select * from `' + tableName + '` where `deleted_at` is null'
            testClass.browse().then(result => {
                result.sql.should.equals(query)
                result.method.should.equals('select')
                done()
            }).catch(err => done(err))    
        })
    })

    describe('#read()' , () => {
        it('should return a valid query', (done) => {
            const query = 'select * from `' + tableName + '` where `deleted_at` is null and `id` = ? limit ?'
            const id = 2
            const limit = 1

            testClass.read(id).then(result => {
                result.sql.should.equals(query)
                result.method.should.equals('first')
                result.bindings[0].should.equals(id)
                result.bindings[1].should.equals(limit)
                done()
            }).catch(err => done(err))
        })
    })

    describe('#edit()' , () => {
        it('should return a valid query', (done) => {
            const query = 'update `'+ tableName +'` set `id` = ?, `label` = ?, `person_id` = ?, `related_to` = ?, `relative_type` = ?, `updated_at` = ? where `id` = ?' 
            const mockObject = {id: 4, person_id: 3, related_to: 53, relative_type: 3, label: 'illum'}
            testClass.edit(mockObject).then(result => {
                result.sql.should.equals(query)
                result.method.should.equals('update')
                result.bindings[0].should.equals(mockObject.id)
                result.bindings[1].should.equals(mockObject.label)
                result.bindings[2].should.equals(mockObject.person_id)
                result.bindings[3].should.equals(mockObject.related_to)
                result.bindings[4].should.equals(mockObject.relative_type)
                done()
            }).catch(err => done(err))
        })
    })

    describe('#add()' , () => {
        it('should return a valid query', (done) => {
            const query = 'insert into `' + tableName + '` (`created_at`, `id`, `label`, `person_id`, `related_to`, `relative_type`, `updated_at`) values (?, ?, ?, ?, ?, ?, ?)'
            const mockObject = {id: 4, person_id: 3, related_to: 53, relative_type: 3, label: 'illum'}
            
            testClass.add(mockObject).then(result => {
                result.sql.should.equals(query)
                result.method.should.equals('insert')
                result.bindings[1].should.equals(mockObject.id)                
                result.bindings[2].should.equals(mockObject.label)
                result.bindings[3].should.equals(mockObject.person_id)
                result.bindings[4].should.equals(mockObject.related_to)
                result.bindings[5].should.equals(mockObject.relative_type)
                                                 
                done()
            }).catch(err => done(err))
        })
    })

    describe('#delete()' , () => {
        it('should return a valid query for soft delete', (done) => {
            
        })

        it('should return a valid query for forced delete', (done) => {
            
        })

        it('should return a valid query for hard delete', (done) => {
            
        })
    })


})
