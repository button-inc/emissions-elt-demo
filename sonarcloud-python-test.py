# This file is for testing the SonarCloud scan. Do not merge.

# OS commands should not be vulnerable to command injection attacks
def ping():
    cmd = "ping -c 1 %s" % request.args.get("host", "www.google.com")
    status = os.system(cmd) # Noncompliant
    return str(status == 0)

# Applications should not create session cookies from untrusted input
from django.shortcuts import render

def check_cookie(request):
    response = render(request, "welcome.html")

    if not "sessionid" in request.COOKIE:
        cookie = request.GET.get("cookie")
        response.set_cookie("sessionid", cookie)  # Noncompliant

    return response

# Assert should not be called on a tuple literal
def test_values(a, b):
    assert (a, b)  # Noncompliant

# Calls should not be made to non-callable values
class MyClass:
    pass

myvar = MyClass()
myvar()  # Noncompliant

none_var = None
none_var()  # Noncompliant
