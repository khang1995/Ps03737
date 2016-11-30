<?php
$label = $_POST["name"];
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 200000)
&& in_array($extension, $allowedExts)) {
    if ($_FILES["file"]["error"] > 0) {
        echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
    } else {
        $filename = $label.".".$extension;
        if (file_exists("upload/" .$label.".gif")) {
            unlink("upload/" .$label.".gif");
        }else if(file_exists("upload/" .$label.".jpg")){
			unlink("upload/" .$label.".jpg");
		}else if(file_exists("upload/" .$label.".jpeg")){
			unlink("upload/" .$label.".jpeg");
		}else if(file_exists("upload/" .$label.".png")){
			unlink("upload/" .$label.".png");
		}
		move_uploaded_file($_FILES["file"]["tmp_name"],"upload/" . $filename);
		echo $filename;
    }
} else {
    echo "Sai định dạng file";
}
?>