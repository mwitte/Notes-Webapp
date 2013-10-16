<?php
/**
 * Created by Matthias Witte
 *
 * http://www.matthias-witte.net/
 * 15.10.13
 */

require_once 'classes/autoloader.php';

class Api {

	const FILENAME = 'store.txt';

	public function sync($notesJson){
		$notesData = json_decode($notesJson, true);
		$newNotes = array();
		foreach($notesData['notes'] as $note){
			$newNotes[$note['id']] = $note;
		}
		try{
			$storedNotesJson = $this->readFromFile();
			$storedNotes = json_decode($storedNotesJson, true);
			if(is_array($storedNotes)){
				$newNotes = array_merge($storedNotes, $newNotes);
				$this->writeToFile(json_encode($newNotes, true));
			}
		}catch (Exception $e){
		}
		return json_encode($newNotes, true);
	}

	protected function  writeToFile($content, $fileName = self::FILENAME){
		try{
			$handle = fopen($fileName, 'w') or die('Cannot open file:  '.$fileName);
			fwrite($handle, $content);
			return true;
		}catch (Exception $e){
			return false;
		}
	}
	protected function readFromFile($fileName = self::FILENAME){
		try{
			$data = null;
			$handle = fopen($fileName, 'r');
			if(filesize($fileName) > 0){
				$data = fread($handle,filesize($fileName));
			}
			return $data;
		}catch (Exception $e){
			return null;
		}
	}
}
$api = new Api();
echo $api->sync(file_get_contents('php://input'));