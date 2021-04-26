use actix::Message;

////////////////////////////////////////////////////////////////////////////////
// Wrapper around a serialized command which can be passed to a Connection
#[derive(Debug, Clone, Message)]
#[rtype(result = "()")]
pub struct CmdSer(pub Vec<u8>);

impl CmdSer {
    pub fn new(cmd: &Command) -> Result<Self> {
        let bin_res = rmp_serde::to_vec(cmd);
        match bin_res {
            Ok(bin) => Ok(Self(bin)),
            Err(e) => {
                error!("couldn't serialize command `{:?}`: {}", cmd, e);
                Err(e)
            }
        }
    }
}
