<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$config['multiple_sites_enabled'] = 'n';
$config['show_ee_news'] = 'n';
// ExpressionEngine Config Items
// Find more configs and overrides at
// https://docs.expressionengine.com/latest/general/system_configuration_overrides.html

$config['app_version'] = '5.4.0';
$config['encryption_key'] = 'fff4f376aa1399cc89b5faab3998235efe33e0ae';
$config['session_crypt_key'] = 'c7d21189ff9fb9870083c175f6084e5b05d20a07';

$config['database'] = array(
	'expressionengine' => array(
		'hostname' => 'db163.pair.com',
		'database' => 'mjfr_jhfarm',
		'username' => 'mjfr_31',
		'password' => 'DTbKxRbB',
		'dbprefix' => 'exp_',
	),
);

require $_SERVER['DOCUMENT_ROOT'] . '/../config/config.master.php';


// EOF