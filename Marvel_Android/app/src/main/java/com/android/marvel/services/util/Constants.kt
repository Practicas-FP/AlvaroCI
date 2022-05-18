package com.android.marvel.services.util

import java.math.BigInteger
import java.security.MessageDigest
import java.sql.Timestamp

class Constants {
    companion object{
        const val BASE_URL = "https://gateway.marvel.com"
        val timeStamp = Timestamp(System.currentTimeMillis()).time.toString()
        const val API_KEY = "d227faa05f90f594c1959e2f56afef55"
        const val PRIVATE_KEY = "d0b9afda5bcccd1ab9432cbf32505027874c826c"
        const val limit = "20"
        fun hash():String{
            val input = "$timeStamp$PRIVATE_KEY$API_KEY"
            val md = MessageDigest.getInstance("MD5")
            return BigInteger(1,md.digest(input.toByteArray())).toString(16).padStart(32,'0')
        }
    }
}