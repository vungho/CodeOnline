module.exports = {
    AwsConfig: {
        accessKeyId: "AKIAITA2YKWWQ3IZM7AQ",
        secretAccessKey: "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",
        region: "us-east-2"
    },
    OpenIdType: {
        Google: "Google",
        Facebook: "Facebook",
        OnlineCodeSystem: "OnlineCode"
    },
    NumberTable: 2,
    Tables: {
        User: {
            Name: "User",
            KeySchema: {
                PartitionKey: {
                    ColumnName: "UserName",
                    KeyType: "HASH"
                },
                SortKey: {
                    ColumnName: "OpenIdType",
                    KeyType: "RANGE"
                }
            },
            Columns: {
                UserName: {
                    ColumnName: "UserName",
                    Type: "S"
                },
                OpenIdType: {
                    ColumnName: "OpenIdType",
                    Type: "S"
                },
                Password: {
                    ColumnName: "Password",
                    Type:
                        "S"
                }
                ,
                Email: {
                    ColumnName: "Email",
                    Type:
                        "S"
                }
                ,
                DateCreated: {
                    ColumnName: "DateCreated",
                    Type:
                        "S"
                }
                ,
                LastLoginDate: {
                    ColumnName: "LastLoginDate",
                    Type:
                        "S"
                }
                ,
            }
        },
        SourceCode: {
            Name: "SourceCode",
            KeySchema: {
                PartitionKey: {
                    ColumnName: "UserName",
                    KeyType: "HASH"
                },
                SortKey: {
                    ColumnName: "FileName",
                    KeyType: "RANGE"
                },
                Columns: {
                    UserName: {
                        ColumnName: "UserName",
                        Type: "S"
                    },
                    FileName: {
                        ColumnName: "FileName",
                        Type: "S"
                    },
                    Content: {
                        ColumnName: "Content",
                        Type: "S"
                    },
                    Language: {
                        ColumnName: "Language",
                        Type: "S"
                    },
                    DateCreated: {
                        ColumnName: "DateCreated",
                        Type: "S"
                    },
                    LastUpdated: {
                        ColumnName: "LastUpdated",
                        Type: "S"
                    }
                }
            }
        }
    }
};