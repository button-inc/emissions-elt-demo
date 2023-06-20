// This file is for testing the SonarCloud scan. Do not merge.

// HTTP request redirections should not be open to forging attacks
let server;
server.get("/redirect", (request, response) => {
  response.redirect(request.query.url); // Noncompliant
});

// Types without members, 'any' and 'never' should not be used in type intersections
function foo(bar: String & null) {
  // Noncompliant
  if (bar) {
    console.log("a");
  }
}

foo(null);

// Jump statements should not occur in "finally" blocks
async function jump() {
  let result, connection, connect;
  try {
    connection = await connect();
    result = connection.send(1);
  } catch (err) {
    console.error(err.message); // if this line throws, this exception will not be propagated
  } finally {
    connection.close();
    return result; // Noncompliant
  }
}

jump();

export {};
