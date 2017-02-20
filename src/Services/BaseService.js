const knex = require('../connection')
const moment = require('moment')
const DATEFORMAT = 'YYYY-MM-DD HH:mm:ss'

class BaseService {
<<<<<<< 0b33e9def51d93db21368e6161353b9860464ea0
    /**
     * Constructor
     */
     //set tablename to null, when extends need to intialize it with string value
     //softDelete flag is set to default = true 
    constructor() {
        this.tableName = null
        this.softDelete = true
    }

    browse() {
        //delete from current table where deleted at = null
        return knex(this.tableName)
            .where('deleted_at', null)
    }

    read(id) {
        //select from current table where table.id=id 
        return knex(this.tableName)
            .where('deleted_at', null)
            .where('id', id)
            .first()
    }

    edit(payload) {
        //add timestamp before edit to payload
        //update where table.id = payload.id
        this.beforeEdit(payload)
        return knex(this.tableName)
            .where('id', payload['id'])
            .update(payload)
    }

    add(payload) {
	 //add timestamp before edit to payload
        //insert payload to current table
        this.beforeAdd(payload)
        return knex(this.tableName)
            .insert(payload)
    }

    delete(payload, isForced) {
        //create query delete
        //execute query
        const query =  knex(this.tableName).where('id', payload['id'])

        if ( ! isForced && this.softDelete) {
            return query.update({'deleted_at': this.getNow()})
        }
        return query.del()
    }

    forceDelete(payload) {
        return this.delete(payload, true)
    }

    beforeAdd(payload) {
        //add timestamp on before add
        if (! payload.created_at) {
            payload.created_at = this.getNow()
        }

        if (! payload.updated_at) {
            payload.updated_at = this.getNow()
        }
    }

    beforeEdit(payload) {
        //add timestamp on before edit
        if (! payload.updated_at) {
            payload.updated_at = this.getNow()
        }

    }
    
    getNow() {
        //get current timestamp
        return (new moment).format(DATEFORMAT)
    }

}

module.exports = BaseService
