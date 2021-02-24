package ut

import (
	"strings"
)

type AutoCreateUT struct {
	Package   string
	Import    []string
	FuncList  []TestFunc
	OriStr    string
	OriFields []string
	Template  string
}

func (a *AutoCreateUT) SetOriStr(s string) *AutoCreateUT {
	a.OriStr = s
	return a
}

func (a *AutoCreateUT) GetTokens() *AutoCreateUT {
	a.OriFields = strings.Fields(a.OriStr)
	return a
}
