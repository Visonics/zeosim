<?php
/*
include 'httpdigest.php';

$HTTPDigest =& new HTTPDigest();
$users = array(
    'user' => md5('user:'.$HTTPDigest->getRealm().':password')
);

if (!$HTTPDigest->getAuthHeader()) {
    $HTTPDigest->send();
    echo 'You hit cancel, good on you.';
} elseif ($username = $HTTPDigest->authenticate($users)) {
    echo "<p>Hello $username.</p>";
    echo "<p>This resource is protected by HTTP digest.</p>";
} else {
    header('HTTP/1.0 401 Unauthorized');
    echo "<p>You shall not pass!</p>";
} 
//*/
//*

define('USER', 'zeosim');
define('PASSWORD', 'mesopores');

if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
    header('WWW-Authenticate: Basic realm="Basic Auth"');
    header('HTTP/1.0 401 Unauthorized');
	exit();
} elseif (isset($_SERVER['PHP_AUTH_USER']) && $_SERVER['PHP_AUTH_USER'] == USER && isset($_SERVER['PHP_AUTH_PW']) && $_SERVER['PHP_AUTH_PW'] == PASSWORD) {
	$httpStatusCode = 200;
	$httpStatusMsg = 'OK';
	$protocol = isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0';
    //header($protocol.' '.$httpStatusCode.' '.$httpStatusMsg);
    //header('HTTP/1.0 200 OK');
	//echo "Hello {$_SERVER['PHP_AUTH_USER']}. {$protocol}";	
    /*echo "<p>You entered '{$_SERVER['PHP_AUTH_PW']}' as your password.</p>";*/
    //echo '<p><a href="zeo.html">Access granted!</a></p>';
} else {
    header('HTTP/1.1 401 Unauthorized');
    echo "Sorry! Contact us to get access.";
	exit();
}
//*/


/*
Copyright (c) 2016 and beyond, Farrukh Shahzad, PhD and Sohel Shaikh, PhD
All rights reserved.

Redistribution in source and binary forms, with or without modification, are  NOT permitted.

Free for educational and researh Use. Any commercial use requires copyright holder's permission and royality agreement. 


THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS 
BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS 
OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Sample was Copyright 1998-2015 by Northwoods Software Corporation.
*/
//
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>ZeoSim 1.0 (2016)</title>


    <!-- Bootstrap core CSS -->
   <link href="css/bootstrap.min.css" rel="stylesheet"> 

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="resources/ie-emulation-modes-warning.js"></script>

<link href="css/zeosim.css" rel="stylesheet" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="resources/bootstrap.min.js"></script>
<script type="text/javascript" src="resources/JSmol.min.js"></script>
<script type="text/javascript" src="resources/jscolor.js"></script>
<script type='text/javascript' src="src/zeosim.js"></script>

</head>

<body>
<div class="header" id="heads">
    <div class="btn btn-primary btn-xs title">Mesoporous Zeolites Simulation</div>
    <br>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <div class="btn btn-primary btn-xs subtitle">Copyright (c) 2016 and beyond, Farrukh Shahzad, PhD and Sohel Shaikh,
        PhD
    </div>
    <span>
    <input  class="btn btn-primary btn-xs right_button" type="button" id="logout" value="Logout" onclick="logout('zeo.php');"/>
    </span>
    <!--
    <a href="javascript:Jmol.loadFile(jmolApplet0,'data/1505106.cif','load &quot;&quot; {1 1 1}')">MFI</a>&nbsp;&nbsp;
    <a href="javascript:Jmol.loadFile(jmolApplet0,'data/4115456.cif','load &quot;&quot; {1.5 1.5 1.5}')">MIF2</a>&nbsp;&nbsp;
    <a href="javascript:Jmol.loadFile(jmolApplet0,'data/CSV.cif','load &quot;&quot; {1 1 1}')">CSV</a> &nbsp;&nbsp;
    <a href="javascript:Jmol.loadFile(jmolApplet0,'data/MEL.cif','load &quot;&quot; {1 1 1}')">MEL</a>
    -->
    <form action="" method="post" class="navbar-form">
        <label>
            <span>Framework:</span>
        <span><select style="width: 70px;" class="btn btn-primary btn-xs" id="fw" onchange="ChangeFW();">
            <option value="ACO.cif">ACO</option>
            <option value="AFR.cif">AFR</option>
            <option value="AST.cif">AST</option>
            <option value="ASV.cif">ASV</option>
            <option value="BEA.cif">BEA</option>
            <option value="CHA.cif">CHA</option>
            <option value="CSV.cif">CSV</option>
            <option value="CZP.cif">CZP</option>

            <option value="FAU.cif">FAU</option>
            <option value="FER.cif">FER</option>
            <option value="AST.cif">AST</option>
            <option value="IFR.cif">IFR</option>
            <option value="LTA.cif">LTA</option>
            <option value="MEL.cif">MEL</option>
            <option value="MFI.cif" selected>MFI</option>
            <option value="MOR.cif">MOR</option>
            <option value="MOZ.cif">MOZ</option>
            <option value="MTW.cif">MTW</option>
            <option value="OFF.cif">OFF</option>
            <option value="PSI.cif">PSI</option>

            <option value="STF.cif">STF</option>
            <option value="TON.cif">TON</option>
            <option value="UOZ.cif">UOZ</option>
            <option value="UTL.cif">UTL</option>

        </select>
		</span>
        </label>

        &nbsp;&nbsp;&nbsp;
        <label>
		<span>
		Symmetry:</span>
		<span><select style="width: 90px;" class="btn btn-primary btn-xs" id="sym" onchange="ChangeSym();">
            <option value="{1 1 1}">{1 1 1}</option>
            <option value="{2 2 1}" selected>{2 2 2}</option>
            <option value="{3 3 1}">{3 3 1}</option>
            <option value="{3 3 3}">{3 3 3}</option>
            <option value="{5 5 5}">{5 5 1}</option>
            <option value="{5 5 5}">{5 5 5}</option>
            <option value="{5 5 5}">{10 10 1}</option>
            <option value="{10 10 5}">{10 10 5}</option>
        </select>
		</span>
        </label>
        <label>
		<span>&nbsp;&nbsp;&nbsp;
		View:</span>
        <span> <select id="view" class="btn btn-primary btn-xs" onchange="control();">
            <option value="best" selected>Best</option>
            <option value="top">Top</option>
            <option value="right">Right</option>
            <option value="front">Front</option>
            <option value="back">Back</option>
            <option value="left">Left</option>
            <option value="bottom">Bottom</option>
            <option value="Show All">Show All</option>
        </select>
		</span>
        </label>
        <label><span>&nbsp;&nbsp;&nbsp;
		Spin:&nbsp;&nbsp;<input type="checkbox" id="spin" onclick="control();"/>&nbsp;&nbsp;&nbsp;
		</span></label>
        <label><span>
		Label:&nbsp;&nbsp;<input type="checkbox" id="label" onclick="control();"/>&nbsp;&nbsp;&nbsp;
		</span></label>
        <label><span>
		Edit:&nbsp;&nbsp;<input type="checkbox" id="edit" onclick="control();"/>&nbsp;&nbsp;&nbsp;
		</span></label>
        <label><span>
		Antialias:&nbsp;&nbsp;<input type="checkbox" id="antialias" onclick="control();"/>&nbsp;&nbsp;&nbsp;
		</span></label>
        <label><span>
		Dark:&nbsp;&nbsp;<input type="checkbox" id="background" onclick="control();"/>
		</span></label>
        <label><span>&nbsp;&nbsp;&nbsp;
		<input type="button" id="btnSave4" class="btn btn-primary btn-xs" value="Save" onclick="save();"/>
		</span></label><label><span>&nbsp;&nbsp;&nbsp;
		<input type="button" id="btnSave6" class="btn btn-primary btn-xs" value="JSON" onclick="saveJSON();"/>
		</span></label>
        &nbsp;&nbsp;&nbsp;
        <label><span><input type="button" id="btnSave" class="btn btn-primary btn-xs" value="Load"
                            onclick="LoadFW('');"/>
		</span></label>
        <br>
        <!--<input type="button" id="btnSave" value="Draw" onclick="Jmol.script(jmolApplet0,'draw c1 circle {10 10 10} {15 15 15} diameter 100');"/>-->
        <label><span>
		Anim GIF: <input type="checkbox" id="save_gif"/>
		</span></label>
        <label><span>&nbsp;&nbsp;&nbsp;
		Diameter (&Aring;):&nbsp;</span><span><input style="width: 40px;" class="btn btn-primary btn-xs" type="number"
                                                     id="radius" value="5" min="1" max="50" maxlength="5"/>
		</span></label>
        <label><span>&nbsp;&nbsp;&nbsp;
		Random:&nbsp;</span><span><input style="width: 40px;" type="number" class="btn btn-primary btn-xs" id="rand"
                                         value="0" min="0" max="5" maxlength="5"/>
		</span></label>
        <label><span>&nbsp;&nbsp;&nbsp;
		Axis:</span><span>
            <select style="width: 85px;" class="btn btn-primary btn-xs" id="axis">
                <option value="x" selected>X (Right)</option>
                <option value="y">Y (Top)</option>
                <option value="z">Z (front)</option>
            </select>
		</span></label>
        <label><span>&nbsp;&nbsp;&nbsp;
		Shape:</span><span>
            <select style="width: 90px;" class="btn btn-primary btn-xs" id="shape">
                <option value="cyliner" selected>Cylinder</option>
                <option value="sphere">Sphere</option>
                <option value="sphere2">Sphere x 2</option>
                <option value="worm">Worm</option>
            </select>
		</span></label>
        <label><span>&nbsp;&nbsp;&nbsp;
		Pattern:</span><span>
            <select style="width: 110px;" class="btn btn-primary btn-xs" id="pattern">
                <option value="pick" selected>Pick</option>
                <option value="across_3">Across (3)</option>
                <option value="across_5">Across (5)</option>
                <option value="grid_3">Grid (3 x 3)</option>
                <option value="grid_5">Grid (5 x 5)</option>
                <option value="random_5">Random (5)</option>
                <option value="random_10">Random (10)</option>
                <option value="sample">Sample</option>
            </select>
		</span></label>
        <label><span>&nbsp;&nbsp;&nbsp;
		Color:
            <select style="width: 90px;" class="btn btn-primary btn-xs" id="coloring">
                <option value=-1>Auto</option>
                <option value=-2>Color Pick</option>
                <option value=0>Blue</option>
                <option value=1>Yellow</option>
                <option value=2>Gray</option>
                <option value=3>Cyan</option>
                <option value=4>Red</option>
                <option value=5>Green</option>
                <option value=6>White</option>
                <option value=7>LightSalmon</option>
            </select>
		<input style="width: 60px;" value="ffcc00" id="colorPick" class="jscolor {position:'right',
			borderColor:'#FFF #666 #666 #FFF',
			insetColor:'#666 #FFF #FFF #666',
			backgroundColor:'#CCC'}" onclick="document.getElementById('coloring').value=-2;">
		</span></label>
        <label><span>&nbsp;&nbsp;&nbsp;
		<input type="button" class="btn btn-primary btn-xs" id="btnSave3" value="Run!" onclick="run_mesopore();"/>
		</span></label>
        <label><span>
		<input type="submit" class="btn btn-primary btn-xs" id="btnSave2" value="Reset" onclick="ChangeFW();"/>
		</span></label>
        <label><span>
		<a id="savesim" href="#">
            <button type="button" class="btn btn-primary btn-xs">Save Simulation</button>
        </a>
		</span></label>
    </form>
</div>

<div class="container" id='parent_div_1'>
    <div id='appdiv'></div>
</div>
<div class="parent_div_1">
    <div id='reportdiv'></div>
</div>

</body>
</html>
