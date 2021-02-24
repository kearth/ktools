package content

import (
	"io/ioutil"
)

func ReadFile(file string) string {
	b, err := ioutil.ReadFile(file)
	if err != nil {
		panic(err.Error())
	}
	return string(b)
}
