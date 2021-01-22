// @ts-check

var pcap = require('pcap'),
    tcp_tracker = new pcap.TCPTracker(),
    pcap_session = pcap.createSession('en0', { filter: "ip proto \\tcp" });
 
tcp_tracker.on('session', function (session) {
  console.log("Start of session between " + session.src_name + " and " + session.dst_name);
  session.on('end', function (session) {
      console.log("End of TCP session between " + session.src_name + " and " + session.dst_name);
  });
});
 
pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet);
    console.log(packet);
    tcp_tracker.track_packet(packet);
});
