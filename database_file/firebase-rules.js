{
    "rules": {
        "videos": {
            ".read": true,
                ".write": false
        },
        "quiz": {
            ".read": "auth != null",
                ".write": "auth != null"
        },
        "answers": {
            ".read": "auth != null",
                ".write": "auth != null"
        },
        "result": {
            "$uid": {
                ".read": "$uid === auth.uid",
                    ".write": "$uid === auth.uid"
            }
        }
    }
}