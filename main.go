package main

import (
	"fmt"
	"github.com/kearth/klib/content"
	"github.com/kearth/klib/ut"
)

func main() {
	a := new(ut.AutoCreateUT)
	a.SetOriStr(content.ReadFile("/Users/jiakun01/test/test.go"))
	a.GetTokens()
	a.GetPackage()
	a.GetImport()
	a.GetFuncList()
	a.Render()
	fmt.Printf("Template:\n%v\n", a.Template)
}
