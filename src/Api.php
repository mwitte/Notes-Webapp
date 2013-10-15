<?php
/**
 * Created by JetBrains PhpStorm.
 * User: wittem
 * Date: 15.10.13
 * Time: 20:58
 * To change this template use File | Settings | File Templates.
 */

class Api {

	const FILENAME = 'store.txt';

	public function sync($notesJson){
		$notesData = json_decode($notesJson, true);
		$newNotes = array();
		foreach($notesData['notes'] as $note){
			$newNotes[$note['id']] = $note;
		}
		$storedNotesJson = $this->readFromFile();
		if($storedNotesJson){
			$storedNotes = json_decode($storedNotesJson, true);
			if(is_array($storedNotes)){
				$newNotes = array_merge($storedNotes, $newNotes);
			}
		}

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
			$handle = fopen($fileName, 'r');
			$data = fread($handle,filesize($fileName));
			return $data;
		}catch (Exception $e){
			return null;
		}
	}
}
$api = new Api();
$api->sync(file_get_contents('php://input'));