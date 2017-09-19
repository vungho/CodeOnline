module.exports = {
    AwsConfig : {
        accessKeyId : "",
        secretAccessKey : "",
        region : ""
    },
    OpenIdType : {
        Google : "Google",
        Facebook : "Facebook",
        OnlineCodeSystem : "OnlineCode"
    },
    NumberTable: 2,
    Tables: [
        {
            Name: "User",
            KeySchema: [
                {
                    ColumnName: "UserName",
                    KeyType: "HASH"
                },
                {
                    ColumnName: "OpenIdType",
                    KeyType: "RANGE"
                }
            ],
            Columns: [
                {
                    ColumnName: "UserName",
                    Type: "S"
                },
                {
                    ColumnName: "OpenIdType",
                    Type: "S"
                },
                {
                    ColumnName: "Password",
                    Type: "S"
                },
                {
                    ColumnName: "Email",
                    Type: "S"
                },
                {
                    ColumnName: "DateCreated",
                    Type: "S"
                },
                {
                    ColumnName: "LastLoginDate",
                    Type: "S"
                },
            ]
        },
        {
            Name: "SourceCode",
            KeySchema: [
                {
                    ColumnName: "UserName",
                    KeyType: "HASH"
                },
                {
                    ColumnName: "FileName",
                    KeyType: "RANGE"
                }
            ],
            Columns: [
                {
                    ColumnName: "UserName",
                    Type: "S"
                },
                {
                    ColumnName: "FileName",
                    Type: "S"
                },
                {
                    ColumnName: "Content",
                    Type: "S"
                },
                {
                    ColumnName: "Language",
                    Type: "S"
                },
                {
                    ColumnName: "DateCreated",
                    Type: "S"
                },
                {
                    ColumnName: "LastUpdated",
                    Type: "S"
                }
            ]
        }
    ]
};