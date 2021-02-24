package ut

import (
	"fmt"
	"strings"
)

type Template struct {
}

func TSpace(n int) string {
	sep := "  "
	s := ""
	for i := 0; i <= n; i++ {
		s = s + sep
	}
	return s
}

func TReturn() string {
	return "\n"
}

func THeader() string {
	return "package %s \n\nimport (\n\t%s \n)\n\n"
}

func TFuncName(n string) string {
	return fmt.Sprintf("func Test%s(t *testing.T){\n", n)
}

// 测试Case
func TCase(input []string, output []string) string {
	s := []string{
		TSpace(1), "table := []struct{", TReturn(), "%s", TReturn(), TSpace(1), "} {", TReturn(), "%s", TReturn(), TSpace(1), "}", TReturn(),
	}
	tparams, tcase := TRandCase(input, output)
	return fmt.Sprintf(strings.Join(s, ""), tparams, tcase)
}

func TRandCase(input []string, output []string) (string, string) {
	s := make([]string, 0)
	o := make([]string, 0)
	for i, v := range input {
		s = append(s, fmt.Sprintf("%sP%d %s,%s", TSpace(4), i, v, TReturn()))
		o = append(o, v)
	}
	for i, v := range output {
		s = append(s, fmt.Sprintf("%sW%d %s,%s", TSpace(4), i, v, TReturn()))
		o = append(o, v)
	}
	return strings.Join(s, ""), fmt.Sprintf("%s", TFullCase(o))
}

func TFullCase(o []string) string {
	s := make([]string, 0)
	for i := 0; i < 3; i++ {
		t := make([]string, 0)
		for _, v := range o {
			fmt.Println(v)
			t = append(t, fmt.Sprintf("%s,", randMap[v]()))
		}
		s = append(s, fmt.Sprintf("%s{%s},%s", TSpace(4), strings.Join(t, ""), TReturn()))
	}
	return strings.Join(s, "")
}

func TObj(c string) string {
	return fmt.Sprintf("\tobj := new(%s)\n", c)
}

func TRun() string {
	h := "\tfor _, v := range table {\n"
	h = h + "\t\tr := obj.%s(%s)\n"
	h = h + "\t\tif r != v.Want {\n"
	h = h + TErrorf()
	return h
}

func TErrorf() string {
	return "\t\t\tt.Errorf(\"want:%s, get:%s\", v.Want, r)\n\t\t}\n\t}\n}\n"
}

func TDefaultImport() string {
	return "\"testing\""
}

func TFunc(t TestFunc) string {
	h := TFuncName(t.FuncName)
	h = h + TCase(t.Input, t.Output)
	if t.Class != "" {
		h = h + TObj(t.Class)
	}
	h = h + TRun()
	t.Template = h
	return t.Template
}

func (a *AutoCreateUT) Render() *AutoCreateUT {
	a.Template = fmt.Sprintf(THeader(), a.Package, TDefaultImport())
	for _, f := range a.FuncList {
		a.Template = a.Template + TFunc(f)
	}
	return a
}
