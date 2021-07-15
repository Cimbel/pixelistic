"# pixelistic_be" 

To start server 
<pre>node bin/www</pre>

<table>
	<tr>
		<th>Method</th>
		<th>Route</th>
		<th>Desc</th>
	</tr>
	<tr>
		<td>POST</td>
		<td>/register</td>
		<td>Register new User</td>
	</tr>
	<tr>
		<td>POST</td>
		<td>/login</td>
		<td>Login</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>/logout</td>
		<td>Logout</td>
	</tr>
<table>

To register users server recieves object like this: 
<pre>{
	nickname: 
	email:
	password:
	passwordConf:
}
</pre>
After successfull registration user object is:  
<pre>{
	_id:
	nickname: 
	email:
	password:
	passwordConf:
	isAdmin:
}
</pre>

In case of succes login or register server sends user object <br>
In case of error - error object <br>

To get user object: <pre>response.user</pre>; <br>
To get error : <pre>response.error</pre>; <br>

