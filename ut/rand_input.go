package ut

var randMap = map[string]func() string{
	"string": RandString,
	"int":    RandInt,
	"bool":   RandBool,
	"float":  RandFloat,
}

func RandInt() string {
	return "0"
}

func RandFloat() string {
	return "0.1"
}

func RandBool() string {
	return "false"
}

func RandString() string {
	return "hello"
}
