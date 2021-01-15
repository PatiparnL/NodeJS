function Success(Data)
{
    return result = {
        data : Data
    }
}

function SuccessCount(Data, Count)
{
    return result = {
        count : Count,
        data : Data
    }
}

function Error(Code,Message)
{
    return result = {
        error : {
            code : Code,
            message : Message
        }
    }
}

module.exports = {
    Success,
    SuccessCount,
    Error
}
