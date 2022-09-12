<?php

function getUserData() {
    wp_localize_script("js/quick-add-post_js", "userData", array(
        "nonce" => wp_create_nonce("wp-rest")
    ));
}

?>