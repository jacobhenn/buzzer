use actix::Message;
use util::command::Command;
use log::error;

////////////////////////////////////////////////////////////////////////////////
/// Wrapper around a serialized command which can be passed to a Connection.
/// This contains a pointer to the data instead of the data itself so that it's
/// not needed to clone the data every time it's passed to another client.
#[derive(Debug, Clone, Message)]
#[rtype(result = "()")]
pub struct CmdSer(pub Vec<u8>);

impl CmdSer {
    pub fn new(cmd: &Command) -> Result<Self, rmp_serde::encode::Error> {
        let bin_res = rmp_serde::to_vec(cmd);
        match bin_res {
            Ok(bin) => Ok(Self(bin)),
            Err(e) => {
                error!("couldn't serialize command `{}`: {}", cmd, e);
                Err(e)
            }
        }
    }
}
