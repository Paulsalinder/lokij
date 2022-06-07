function getConfig() {
    var config = {};
    config.appBase = 'https://www.americafirst.com/brd/';

    // IdentityServerConfig
    config.authority = 'https://www.americafirst.com/brd/identity';
    config.clientId = 'RemoteDeposit';
    config.scope = 'openid profile email inst_info rd_user_info dev_info  api';
    // remoteDepositConfig.claims = 'sub name family_namegiven_name middle_name nickname preferred_username profile picture website gender birthdate zoneinfo locale updated_at email email_verified';
    config.secret = 'secret';
    config.grant_type = 'password';
    config.idle = 600; // idle value in seconds : 600 seconds = 10 min
    config.timeout = 60; // timeout value in seconds: Once Idle time is reached, a popup will display before logoff 60 default
    config.minClientVersion = '3.9.0';
    return config;
}

// this can replace defining remoteDepositConfig in the index.html
//window.remoteDepositConfig = getConfig();
