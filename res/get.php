<?php
	header("charset=utf-8");
	
	$params = json_decode(file_get_contents('php://input'));
	
	//echo $_POST['username'];

	$con = mysql_connect('localhost','root','root');
	mysql_query("set names utf8");
	mysql_select_db('job',$con);
			
	$resJson = array();
	
	if(!$con){
		//die('could not connect:'.mysql_error());
		$resJson.array_push($resJson,'status:::系统繁忙，请稍后再试' );
		echo json_encode($resJson);
	} else {
		$start = time();
		
		$method = $_SERVER['REQUEST_METHOD'];
			
		switch ($method){
			case 'GET':
				
				switch($_GET['action']){
					case 'get':
						$uId = $_GET['uId'];		
						
						$sql = "select name from userInfo where id = ".$uId;
						
						$result = mysql_query($sql);
						
						while($res = mysql_fetch_assoc($result)){
							$resJson.array_push($resJson,$res);
						}
						echo json_encode($resJson);
						
						break;
				}
				break;
				
			case 'POST':
				//...
				switch($_POST['action']){
					case 'login':
						$name = $_POST['name'];
						$pwd = $_POST['pwd'];
						
						$sql = "select count('id') as num from userinfo where name = '".$name."' and password = '".$pwd."'";
						$result = mysql_query($sql);
						
						while($res = mysql_fetch_assoc($result)){
								
							print_r(json_encode($res));
						}			
						
						break;
				}
				break;
			
			case 'PUT':
				//...
				break;
				
			case 'DELETE':
				//...
				break;
				
			case 'JSONP':
				//...
				break;
				
		}
		$end = time();$runtime = $end-$start;
		$resJson.array_push($resJson,$runtime);

		mysql_close($con);
		
	}


?>