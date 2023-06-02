use converter_buddy::{io::ConvertibleFile, format::Format, converter::{ConversionError, Converter}};
use std::{fs::{File}, io::{Read, Write}};

use crate::files_utils::get_format;
use async_trait::async_trait;

#[async_trait]
trait ConvertionFeatures {
    async fn convert_with_target(&self, target_format: Format, output_path: &str) ->Result<File, ConversionError>;
}

#[async_trait]
impl ConvertionFeatures for ConvertibleFile {
    async fn convert_with_target(&self, target_format: Format, output_path: &str) -> Result<File, ConversionError> {
        let source_format = self.format().ok_or(ConversionError::UnknownSourceFormat)?;

        // let target_format_ext = target_format.info().preferred_extension;
        // let full_target_ext: String = String::from("cb.") + target_format_ext;
        // let full_path = &self.path.with_extension(full_target_ext);

        let mut src_file = File::open(&self.path).map_err(ConversionError::IoError)?;
        let mut target_file = File::create(output_path).map_err(ConversionError::IoError)?;

        let mut input_buffer = Vec::<u8>::new();
        let mut output_buffer = Vec::<u8>::new();

        // read buffer from source file
        src_file
            .read_to_end(&mut input_buffer)
            .map_err(ConversionError::IoError)?;

        let converter = Converter::try_from(source_format)?;
        converter.process(&input_buffer, &mut output_buffer, target_format.try_into()?)?;

        target_file
            .write_all(&output_buffer)
            .map_err(ConversionError::IoError)?;
        Ok(target_file)
    }

}

#[tauri::command(async)]
pub fn convert_file(path: &str, output_format: &str, output_path: &str) -> Result<bool, bool> {
    let file: ConvertibleFile = ConvertibleFile::new(path);
    file.format().expect("error in the input format");
    let target_format: Format = get_format(output_format).unwrap();

    match file.convert_with_target(target_format, output_path)? {
        Ok(_) => true,
        Err(_) => false,
    }
}
