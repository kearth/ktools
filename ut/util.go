package ut

import (
	_ "fmt"
	"strings"
)

func IsClassMethod(s string) bool {
	return strings.HasPrefix(s, "(")
}

func GetClassName(s string) string {
	return strings.TrimPrefix(strings.TrimSuffix(s, ")"), "*")
}

func GetFuncName(s string) string {
	i := strings.Index(s, "(")
	return s[0:i]
}

func GetInput(s []string) ([]string, int) {
	n := make([]string, 0)
	var index int
	for i, v := range s {
		index = i + 1
		if strings.HasSuffix(v, ",") {
			n = append(n, strings.TrimSuffix(v, ","))
		}
		if strings.HasSuffix(v, ")") {
			n = append(n, strings.TrimSuffix(v, ")"))
			break
		}
	}
	return n, index
}

func GetOutput(s []string) ([]string, int) {
	n := make([]string, 0)
	l := len(s)
	var index int
	for i, v := range s {
		index = i + 1
		if strings.HasSuffix(v, ",") {
			t := v
			if strings.HasPrefix(t, "(") {
				t = strings.TrimPrefix(t, "(")
			}
			n = append(n, strings.TrimSuffix(t, ","))
		}
		if strings.HasSuffix(v, ")") {
			n = append(n, strings.TrimSuffix(v, ")"))
			break
		}
		if (i+1 < l) && strings.HasSuffix(s[i+1], "{") {
			break
		}
	}
	return n, index
}

func List2String(s []string) string {
	n := ""
	for _, v := range s {
		n = n + "\n" + v
	}
	return n
}
